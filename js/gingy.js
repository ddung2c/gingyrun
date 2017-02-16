
var Gingy = {
	prev_state : 'right', // Stores the previous state
	state : 'right', // left, right, whirl, jump_right, jump_left
	maxy : 240,
	y : 0,   // y position for jump
	vy_start: 18, // initial velocity in vy
	vy : 0,  // velocity for jump in y
	vymax : 52, // max velocity in y
	a : -1,  // Acceleration for jump
    x : 0, // position in x 
    vx : -12,  // velocity in x
    images : { 	left : "img/lgingy1.gif", 
				right : "img/rgingy1.gif", 
				jump_right : "img/jump1.gif",
				jump_left : "img/ljump1.gif" 
			},
    $sprites: null,
	width: null,
	init : function( width ) {
        // Put the gingy on the screen
		this.width = width;
		this.$sprites = $.preload( this.images );
        $('div#Gingy').empty().append(this.$sprites['right']);
    },
	change_image : function( img ) {
		var last; 
		if ( img !== last ) 
			$('div#Gingy').empty().append(this.$sprites[img]);
		last = img;
	},	
	go_left : function() {	this.state = 'left'; },
	go_right : function() {	this.state = 'right' },	
	jump_right : function() { this.state = 'jump_right' },
	jump_left : function() { this.state = 'jump_left' },
	jump : function() { 
		if (this.vy <= this.vymax ) {
			this.vy += this.vy_start;
			if ( this.state === 'left' ) this.jump_left();
			else if ( this.state === 'right' ) this.jump_right();	
		}
	},
  change_direction : function() {
    this.vx *= -1.0;
    if ( this.state === 'right' ) this.go_left();
    else if ( this.state === 'left' ) this.go_right();
    else if ( this.state === 'jump_right' ) this.jump_left();
    else if ( this.state === 'jump_left' ) this.jump_right();
  },
    run : function() {
      if ( this.state === 'jump_left' || this.state === 'jump_right' ) {
        this.y = this.a + this.vy + this.y;
        this.vy = this.a + this.vy;
        // limit y value for jump
        if ( this.y > this.maxy ) this.y = this.maxy;
        // Check to see if the jump is finished
        if ( this.y < 0  && this.state === 'jump_right' ) {
          this.vy = 0;
          this.go_right();
        } else if ( this.y < 0  && this.state === 'jump_left' ) {
          this.vy = 0;
          this.go_left();	
        }
      }
      // Check to see if all the background images have wrapped around
      if (this.x * (1.0 / 12.0) <= -this.width || this.x * (1.0 / 12.0) >= this.width) {
        this.x = 0;
      }
		
      // update the x position of the gingy
      this.x = this.x + this.vx;
		
      // Switch to the appropriate image based on the state of the gingy
      this.change_image( this.state );
		
      // move the current gingy image into position
      $('#Gingy').css('top', (this.maxy-this.y) );
    }
}


