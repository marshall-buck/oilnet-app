module.exports = {
  pages: {
    index: {
      entry: './src/main.js',
      title: 'Main Page',
    },
    histChart: {
      entry: './src/pages/histChart/histMain.js',
      title: 'Histogram',
    },
    intChart: {
      entry: './src/pages/intChart/intMain.js',
      title: 'Intensity',
    },
    table: {
      entry: './src/pages/table/tableMain.js',
      title: 'Measurements',
    },
    downloadStudy: {
      entry: './src/pages/studyIdModal/studyIdModal.js',
      title: 'Download Study',
    },

    test: {
      entry: './src/pages/test/test.js',
      title: 'Test',
    },
  },
  // devServer: {
  //   open: 'Google Chrome',
  // },

  pluginOptions: {
    electronBuilder: {
      preload: 'src//electron/preload.js',
      mainProcessFile: 'src/electron/background.js',
      externals: ['node-fetch'],
    },
  },
};
