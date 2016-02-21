	function readURL(input) {
		if (input.files && input.files[0]) {

			var reader = new FileReader();

			reader.onload = function (e) {
				$('.file-upload-image').attr('src', e.target.result);
				$('.image-upload-wrap').show();
				$('.image-title').html(input.files[0].name);
			};

			reader.readAsDataURL(input.files[0]);

		}  else {
			$('.image-upload-wrap').hide();
		}
	}

	function removeUpload(){
		$('.file-upload-input').replaceWith($('.file-upload-input').clone());
		$('.image-upload-wrap').hide();
	}