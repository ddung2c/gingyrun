
var gingyController = {
    // Variables
    $background : null,
    $gingy : null,
    init : function() {
		this.$background = $("#GingyBackground_back");
		this.$gingy = Object.create(Gingy);
		this.$gingy.init(this.$background.width());
        $("body").dblclick( this.$gingy.change_direction.bind(this.$gingy) );
		$("body").click( this.$gingy.jump.bind(this.$gingy) );
    },
    draw : function() {
        requestAnimFrame( gingyController.draw.bind(this), 25);
		if ( typeof this.$gingy != "undefined" ) {
			this.$gingy.run();
			var xpos = this.$gingy.x;
			var ypos = this.$gingy.y;			
			$('#GingyBackground_back').css('background-position', (xpos * (1.0 / 12.0)));
			$('#GingyBackground_mid').css('background-position', (xpos * (1.0 / 6.0)));
			$('#GingyBackground_front').css('background-position', xpos);
		}
    }
};

$(document).ready(function () {
    gingyController.init();
    gingyController.draw();
});