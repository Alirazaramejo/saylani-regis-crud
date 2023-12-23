$(document).ready(function(){
	$(".btn-convert").click(function(){
		var convertionType = $("#convertion-type").val();
		if(convertionType == "split") {
			splitHTMLtoMultiPagePDF();
		} else {
			addHTMLToPDFPage();
		}
	});
});

function addHTMLToPDFPage() {

	var doc = new jsPDF('p', 'pt', [$("body").width(), $("body").height()]);
	
	converHTMLToCanvas($("#html-template")[0], doc, false, false);
	
	converHTMLToCanvas($("#html-template1")[0], doc, true, false);
	
	converHTMLToCanvas($("#html-template2")[0], doc, true, true);
}

function converHTMLToCanvas(element, jspdf, enableAddPage, enableSave) {
	html2canvas(element, { allowTaint: true }).then(function(canvas) {
		if(enableAddPage == true) {
			jspdf.addPage($("body").width(), $("body").height());
		}
		
		image = canvas.toDataURL('image/png', 1.0);
		jspdf.addImage(image, 'PNG', 15, 15, $(element).width(), $(element).height()); // A4 sizes
		
		if(enableSave == true) {
			jspdf.save("add-to-multi-page.pdf");
		}
	});
}

function splitHTMLtoMultiPagePDF() {
	var htmlWidth = $(".single-html-block").width();
	var htmlHeight = $(".single-html-block").height();
	var pdfWidth = htmlWidth + (15 * 2);
	var pdfHeight = (pdfWidth * 1.5) + (15 * 2);
	
	var doc = new jsPDF('p', 'pt', [pdfWidth, pdfHeight]);

	var pageCount = Math.ceil(htmlHeight / pdfHeight) - 1;


	html2canvas($(".single-html-block")[0], { allowTaint: true }).then(function(canvas) {
		canvas.getContext('2d');

		var image = canvas.toDataURL("image/png", 1.0);
		doc.addImage(image, 'PNG', 15, 15, htmlWidth, htmlHeight);


		for (var i = 1; i <= pageCount; i++) {
			doc.addPage(pdfWidth, pdfHeight);
			doc.addImage(image, 'PNG', 15, -(pdfHeight * i)+15, htmlWidth, htmlHeight);
		}

		doc.save("split-to-multi-page.pdf");
	});
};


