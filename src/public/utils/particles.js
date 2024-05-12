particlesJS("particles-js", {
	"particles": {
		"number": {
			"value": 50,
			"density": {
				"enable": true,
				"value_area": 1000
			}
		},
		"color": {
			"value": [
				"#00aaff",
				"#ffffff"
			]
		},
		"shape": {
			"type": "polygon",
			"stroke": {
				"width": 0,
				"color": "#ffffff"
			},
			"polygon": {
				"nb_sides": 7
			},
			"image": {
				"src": "img/github.svg",
				"width": 100,
				"height": 100
			}
		},
		"opacity": {
			"value": 0.5,
			"random": false,
			"anim": {
				"enable": false,
				"speed": 1,
				"opacity_min": 0.1,
				"sync": false
			}
		},
		"size": {
			"value": 1,
			"random": false,
			"anim": {
				"enable": false,
				"speed": 40,
				"size_min": 0.1,
				"sync": false
			}
		},
		"line_linked": {
			"enable": true,
			"distance": 120,
			"color": "#ffffff",
			"opacity": 0.4,
			"width": 0.01
		},
	},
	"interactivity": {
		"detect_on": "canvas",
		"events": {
			"onhover": {
				"enable": false,
				"mode": "grab"
			},
			"onclick": {
				"enable": false
			},
			"resize": true
		},
		"modes": {
			"grab": {
				"distance": 150,
				"line_linked": {
					"opacity": 1
				}
			},
			"bubble": {
				"distance": 400,
				"size": 40,
				"duration": 2,
				"opacity": 8,
				"speed": 3
			},
			"repulse": {
				"distance": 200,
				"duration": 0.4
			},
			"push": {
				"particles_nb": 4
			},
			"remove": {
				"particles_nb": 2
			}
		}
	},
	"retina_detect": true
})
