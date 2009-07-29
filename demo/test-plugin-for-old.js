(function($) {

$.fn.extend({
	testVersions: function() {
		return this
			.empty()
			.append("<div>I'm the OLD plugin</div>")
			.append("<div>Loaded in jQuery version " + $.fn.jquery +"</div>");
	}
});

})(jQuery);

