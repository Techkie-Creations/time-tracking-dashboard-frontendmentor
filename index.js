let vals;

fetch("./data.json")
	.then((res) => res.json())
	.then((data) => {
		vals = data;
		console.log(vals[0].timeframes["weekly"].current);
		time();
	});

function time(value = "weekly", arr = ["daily", "monthly"]) {
	for (let i = 0; i < vals.length; i++) {
		$(`.stat.${vals[i].title.toLowerCase()} .now`).text(
			`${vals[i].timeframes[value].current}`
		);
		$(`.stat.${vals[i].title.toLowerCase()} .prev`).text(
			`${vals[i].timeframes[value].previous}`
		);
		$(`.${arr[0]}, .${arr[1]}`).removeClass("chosen");
		$(`.${value}`).addClass("chosen");
	}
	gsap.from(".now", {
		textContent: 0,
		duration: 2,
		ease: Power1.easeIn,
		snap: { textContent: 1 },
		stagger: 0.5,
	});
}

let animate = () => {
	let tl = gsap.timeline({ duration: 1, ease: "none" });
	tl.from(".profile", {
		scale: 1.5,
		opacity: 0,
		duration: 1.5,
		ease: "bounce.out",
	})
		.from(
			".stat",
			{
				x: "-300%",
				duration: 1.5,
				opacity: 0,
				ease: "elastic.out",
			},
			"<"
		)
		.from(".inner", {
			y: "700%",
			duration: 1.1,
			opacity: 0,
			ease: "bounce.out",
			stagger: 0.3,
		})
		.from(
			".profile .id",
			{
				y: "-300%",
				opacity: 0,
			},
			"<"
		)
		.from(
			[".avatar", ".profile .id .detail p", "h1"],
			{
				y: "-300%",
				opacity: 0,
				stagger: 0.5,
			},
			"< 1"
		)
		.from(
			".timestamps li",
			{
				y: "-300%",
				opacity: 0,
				stagger: 0.5,
			},
			"< 1"
		)
		.from(".avatar", {
			rotateY: 360,
		});
};

$(document).ready(() => {
	animate();
	time();
});
