from os import error
import pydicom
import cv2
import numpy as np
import json
from concurrent.futures import ThreadPoolExecutor
import sys

obj = json.loads(sys.argv[1])


studyNo = obj['studyNo']
width = obj['width']
center = obj['center']
filePaths = obj['filePaths']
path_to_ct_folder = obj['ct']


def get_LUT_value(data, width, center):
    # Adjust according to LUT, width center(center) and width values
    # xxx=np.piecewise(x, [condition1,condition2], [func1,func2])
    return np.piecewise(data,
                        [data <= (center-0.5-(width-1)/2),
                         data > (center-0.5+(width-1)/2)],
                        [0, 255, lambda data: ((data-(center-0.5))/(width-1)+0.5)*(255-0)])


def write_file_to_path(dcm_file_path, jpg_file_path, window_width, window_center):
    ds = pydicom.dcmread(dcm_file_path)
    pixel_array = ds.pixel_array.astype(float)
    # process the image
    rescale_slope = ds.RescaleSlope
    rescale_intercept = ds.RescaleIntercept
    pixel_array = (pixel_array)*rescale_slope+rescale_intercept
    # print(f'after slope * intercept \n {pixel_array}')
    pixel_array = get_LUT_value(pixel_array, window_width, window_center)
    # print(f'after get_LUT \n {pixel_array}')
    pixel_array = pixel_array.astype('uint8')
    # print(f'after uint8 \n {pixel_array}')
    cv2.imwrite(jpg_file_path, pixel_array, [
                int(cv2.IMWRITE_JPEG_QUALITY), 100])


def create_pshop_json(namesList):
    js = {'zeroNinety': [], 'axials': []}
    dsListZ = []
    dsAxials = []

    for name in namesList:
        ds = pydicom.dcmread(name)

        if ds.SliceLocation != 0:
            js['axials'].append({'org-path': name})
            dsAxials.append(ds)

        else:
            js['zeroNinety'].append({'org-path': name})
            dsListZ.append(ds)

    for num, item in enumerate(js['zeroNinety']):
        if num == 0:
            item['fileName'] = 'b-0'

        elif num == 1:
            item['fileName'] = 'b-90'

        else:
            item['fileName'] = f'b-{num}-extra'

    for num, item in enumerate(js['axials']):
        item['offset'] = abs(int(dsAxials[num].SliceLocation))

        item['fileName'] = f'a-{num+1}'
    if len(dsListZ) == 0:
        js['Depth'] = dsAxials[0].AccessionNumber
        js['Client'] = f'{dsAxials[0].PatientID} {dsAxials[0].PatientName}'
        js['Sample'] = dsAxials[0].StudyDescription
        js['Well'] = str(dsAxials[0].ReferringPhysicianName)
    else:
        js['Depth'] = dsListZ[0].AccessionNumber
        js['Client'] = f'{dsListZ[0].PatientID} {dsListZ[0].PatientName}'
        js['Sample'] = dsListZ[0].StudyDescription
        js['Well'] = str(dsListZ[0].ReferringPhysicianName)

    return js


def save_to_jpeg():
    """Saves fiel to jpg"""
    names = filePaths

    js = create_pshop_json(names)
    jsList = []
    for item in js['axials']:
        jsList.append(item)
    for item in js['zeroNinety']:
        jsList.append(item)
    # get Current study number
    # studyNo = re.search(r"\d{5}", names[0]).group()

    # Loop through names list start progress bar write jpg file
    try:
        for num, filePath in enumerate(names):
            print(f'filepath', filePath)
            for obj in jsList:
                if obj['org-path'] == filePath:
                    fileName = f'{obj["fileName"]}'
            if num == 0:
                with open(f'{path_to_ct_folder}/{studyNo}/{studyNo}.json', 'w') as outfile:
                    json.dump(js, outfile)
            jpgPath = f'{path_to_ct_folder}/{studyNo}/{fileName}.jpeg'

            with ThreadPoolExecutor(max_workers=6) as executor:
                executor.submit(write_file_to_path, filePath, jpgPath,
                                width, center)
        print('Python Success')
    except Exception as e:
        print("type error: " + str(e))
