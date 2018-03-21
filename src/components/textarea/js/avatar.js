'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarInputElement = document.querySelector('#avatar');
  var avatarPreviewElement = document.querySelector('.notice__preview img');

  avatarInputElement.addEventListener('change', function () {
    var file = avatarInputElement.files[0];
    var fileName = file.name.toLowerCase();

    var isRightFormat = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (isRightFormat) {
      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.addEventListener('load', function () {
        avatarPreviewElement.src = reader.result;
      });
    }
  });
})();
