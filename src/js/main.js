(function($){
	'use strict';

	var winScrollPos = $('body').scrollTop();

	
	$(document).ready(function(){

		// Modal
		// -------
		$('.call-modal').on('click', function(ev) {
			ev.preventDefault();
			winScrollPos = $('body').scrollTop();
			$('body').addClass('modal-opened');
			$('#formModal').addClass('-active');
			$('#formModal .form-error').hide();
			$('#feedbackForm input').removeClass('-error');
			$('#formModal').find('.modal-title').text($(this).data('modalTitle'));
		});

		$('.white-page, .close-btn').on('click', function(ev) {
			ev.preventDefault();
			$(this).closest('.modal').removeClass('-active').removeClass('-success').removeClass('-error');
			$(this).closest('.modal').find('form')[0].reset();
			$('body').removeClass('modal-opened');
			$('body').scrollTop(winScrollPos);
		});

		

	    $("#uPhone").mask('+7 (999) 999-99-99',{placeholder:"x"});
		$("#uPhone").on('focus', function(){ 
		if ($(this).val('')) {
				$(this).val('+7 ');
			}
		});


	    $('#feedbackForm input').on('focus', function(){
	    	$(this).removeClass('-error');
	    	if (!$('#feedbackForm input').hasClass('-error')) {
	    		$('.form-error').hide();
	    	}
	    });
	    // end Modal

	    $('#feedbackForm').on('submit', function(ev){
			ev.preventDefault();
			var self = this;

			if ($('#uName').val().length == 0) {
				$('#uName').addClass('-error');
				$('.form-error').show();
				return false;
			}

			if ($('#uEmail').length && $('#uEmail').val().length == 0 && $('#uEmail').val().indexOf('@') == -1) {
				$('#uEmail').addClass('-error');
				$('.form-error').show();
				return false;
			}

			if ($('#uPhone').val().length < 10) {
				$('#uPhone').addClass('-error');
				$('.form-error').show();
				return false;
			}
			
			var formData = $("#feedbackForm").serialize();

			// console.log(formData);
	        $.ajax({
	            type: "post",
	            url: "send.php",
	            data: formData,
	            // dataType: "text",
	            success: function(data){
	            	$("#feedbackForm")[0].reset();
	                if (data == true){
	                	$('#formModal').removeClass('-error');
	                    $('#formModal').addClass('-success');
	                } else {
	                	$('#formModal').removeClass('-success');
						$('#formModal').addClass('-error');
	                }
	            },
	            error: function(xhr, str){
	                $("#feedbackForm")[0].reset();
	                $('#formModal').removeClass('-success');
	                $('#formModal').addClass('-error');
	            }
	        });
		});

	});
	
	//initYMap(document.getElementById('map'), mapData.address, mapData.hint);

	function initYMap(elem, adr, hint){
		ymaps.ready(function(){
			ymaps.geocode(adr).then(function(res) {
				var pointCoords = res.geoObjects.get(0).geometry.getCoordinates();
				//console.log(pointCoords);
				var yaOffice = new ymaps.Placemark(pointCoords, {hintContent: hint, balloonContent: adr});
				var yaMapContacts2 = new ymaps.Map(elem, {
					center: [pointCoords[0], pointCoords[1]],
					zoom: 15
				});
				yaMapContacts2.geoObjects.add(yaOffice);
			});
		});
	};

	

})(jQuery);