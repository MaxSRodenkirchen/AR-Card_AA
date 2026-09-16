const onxrloaded = () => {
  XR8.XrController.configure({
    imageTargetData: [
      require('../image-targets/cat-cropped.json'),
      require('../image-targets/aa-enevelope_3.json'),

      require('../image-targets/AA_Brief-2.json'),
      require('../image-targets/AA-Siegel.json'),
      require('../image-targets/AA-Logo.json')

    ],
  })
}
window.XR8 ? onxrloaded() : window.addEventListener('xrloaded', onxrloaded)