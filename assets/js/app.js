$(document).ready(function() {
	$(".input-table").on("mouseenter", ".input-row", function() {
		if($(this).index() != 1 || $(".input-row").length != 1)
			$(this).find(".delete-btn").css("visibility", "visible");
	});

	$(".input-table").on("mouseleave", ".input-row", function() {
		$(this).find(".delete-btn").css("visibility", "hidden");
	});

	$(".input-table").on("click", ".delete-btn", function() {
		$(this).parent().remove();
		updateQPI();
	});

	// $(".accordion").on("click", function() {
	// 	$(".input-table").append("<tr class='input-row'>" + $(".input-row").html() + "</tr>");
	// });

	$(".input-card").on("change", ".input-select", updateQPI);

	$(".accordion").on("click",function(){
		// /* Toggle between adding and removing the "active" class,
		// to highlight the button that controls the panel */
		// this.classList.toggle("active");
    //
		// /* Toggle between hiding and showing the active panel */
		// var panel = this.nextElementSibling;
		// if (panel.style.display === "block") {
		// 		panel.style.display = "none";
		// } else {
		// 		panel.style.display = "block";
		// }
		$(".input-table").append("<tr class='input-row'>" + $(".input-row").html() + "</tr>");
	};

	qpi = "";




	function updateQPI() {
		rowTotal = $(".input-row").length;
		gradeTotal = 0;
		unitTotal = 0;

		for(i = 0; i < rowTotal; i++) {
			gradeSelectVal = $(".input-row:eq(" + i + ") .grade-select").val();

			if (gradeSelectVal != "-") {
				grade = parseFloat(gradeSelectVal);
				units = parseFloat($(".input-row:eq(" + i + ") .unit-select").val());
				gradeTotal += grade*units;
				unitTotal += units;
			}
		}

		if (isNaN(qpi)) {
			qpi = (gradeTotal/unitTotal).toFixed(2);
			setQPI(qpi);
		} else {
			qpi = (gradeTotal/unitTotal).toFixed(2);
			animateQPI(Math.abs(qpi - parseFloat($(".qpi-display").text()))/20);
		}




	}

	var animateQPI = function(step) {
		window.setTimeout(function() {
			if ($(".qpi-display").text() != qpi) {
				gradeDisplay = parseFloat($(".qpi-display").text());

				if (Math.abs(qpi - (gradeDisplay + step)) < step)
					step = Math.abs(qpi - gradeDisplay);

				if (step < 0.01)
					step = 0.01;

				if ($(".qpi-display").text() < qpi)
					addend = step;
				else
					addend = -step;

				setQPI((gradeDisplay + addend).toFixed(2));

				animateQPI(step);
			}
		}, 20);
	}



	function setQPI(qpi) {
		// var xx = parseFloat(document.getElementById("changeColour").innerHTML)
		// // if (xx < 2 ) {
		//     document.getElementById("changeColour").style.color = "red";
		// // }



		if (!isNaN(qpi))
			$(".qpi-display").text(qpi);
			if(qpi < 1){
				// $(".changeColor").css('color', 'red');
				$("#test").text("????");
			}


		else
			$(".qpi-display").text("-");
	}
});
