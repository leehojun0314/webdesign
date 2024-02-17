document.addEventListener('DOMContentLoaded', (event) => {
	handleScrollEvent();
	generateServiceList();
	handleSearchInputChange();
	handleTabMenu();
});
function handleTabMenu() {
	const glassesUl = document.getElementById('glasses');
	const sunglassesUl = document.getElementById('sunglasses');
	const contactlensUl = document.getElementById('contactlens');
	const tabs = document.querySelectorAll('#product > nav > span');
	glassesUl.style.display = 'block';
	tabs[0].style.backgroundColor = 'grey';
	for (let i = 0; i < tabs.length; i++) {
		tabs[i].addEventListener('click', () => {
			glassesUl.style.display = 'none';
			sunglassesUl.style.display = 'none';
			contactlensUl.style.display = 'none';
			tabs.forEach((tab) => (tab.style.backgroundColor = 'white'));
			tabs[i].style.backgroundColor = 'grey';

			switch (i) {
				case 0: {
					glassesUl.style.display = 'block';
					break;
				}
				case 1: {
					sunglassesUl.style.display = 'block';
					break;
				}
				case 2: {
					contactlensUl.style.display = 'block';
					break;
				}
				default: {
					return;
				}
			}
		});
	}
}
function getRandomColor() {
	var red = Math.floor(Math.random() * 128) + 128;
	var green = Math.floor(Math.random() * 128) + 128;
	var blue = Math.floor(Math.random() * 128) + 128;
	// return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
	return {
		red,
		green,
		blue,
	};
}

function handleScrollEvent() {
	document.querySelector('#home > footer').addEventListener('click', () => {
		const section = document.querySelector('#about');

		window.scrollTo({
			top: section.offsetTop - 50,
			behavior: 'smooth',
		});
	});
	let timeout;
	let isSystemScroll = false;
	if (detectDeviceType() === 'Desktop') {
		window.addEventListener(
			'scroll',
			function (e) {
				if (isSystemScroll) {
					return;
				}
				window.clearTimeout(timeout);
				timeout = setTimeout(() => {
					isSystemScroll = true;
					//execute logic after scroll
					const sections = document.querySelectorAll('main > section');
					//get the position of the current window
					const scrollPosition = window.scrollY;
					let closest = sections[0];
					//give a standard to compare
					for (let i = 0; i < sections.length; i++) {
						let diff = Math.abs(sections[i].offsetTop - scrollPosition);
						//calculate the distances from current window position
						if (Math.abs(closest.offsetTop - scrollPosition) >= diff) {
							closest = sections[i];
						}
					}
					if (closest === sections[sections.length - 1]) {
						isSystemScroll = false;
						return;
					}
					window.scrollTo({
						top: closest.offsetTop - 50,
						behavior: 'smooth',
					});
					setTimeout(() => {
						isSystemScroll = false;
					}, 500);
				}, 500);
			},
			false,
		);
	}
}
function generateServiceList() {
	const ul = document.querySelector('#service > div:nth-of-type(2) > ul');

	for (let service of services) {
		const li = document.createElement('li');
		li.textContent = service.name;
		const color = getRandomColor();
		li.style.backgroundColor = `rgba(${color.red}, ${color.blue}, ${color.green}, 0.5)`;
		let modal;
		function attachModal(evt) {
			evt.target.style.backgroundColor = `rgba(${color.red}, ${color.blue}, ${color.green}, 0.8)`;
			modal = document.createElement('div');

			if (service.add) {
				li.append(modal);

				modal.id = 'modal';
				modal.textContent = service.add;
				modal.style.position = 'absolute';
				requestAnimationFrame(() => {
					const widthDiff = (modal.offsetWidth - li.offsetWidth) / 2;
					modal.style.left = modal.offsetLeft - widthDiff + 'px';
					modal.style.top = li.offsetTop - modal.offsetHeight - 10 + 'px';
				});
			}
		}
		if (detectDeviceType() === 'Mobile') {
			li.addEventListener('mousedown', attachModal);
			li.addEventListener('mouseout', (evt) => {
				evt.target.style.backgroundColor = `rgba(${color.red}, ${color.blue}, ${color.green}, 0.5)`;
				if (service.add) {
					for (let el of document.querySelectorAll('#modal')) {
						li.removeChild(el);
					}
				}
			});
		} else {
			li.addEventListener('mouseenter', attachModal);
			li.addEventListener('mouseleave', (evt) => {
				evt.target.style.backgroundColor = `rgba(${color.red}, ${color.blue}, ${color.green}, 0.5)`;
				if (service.add) {
					for (let el of document.querySelectorAll('#modal')) {
						li.removeChild(el);
					}
				}
			});
		}

		ul.appendChild(li);
	}
}
const services = [
	{
		name: 'Eye Examinations',
		add: 'May be bulk billed',
	},
	{
		name: 'Spectacles',
		add: 'May be bulk billed to private Health Fund optical cover',
	},
	{
		name: 'Diabetic Eye Examinations',
		add: '',
	},
	{
		name: 'Color Vision Asessments',
		add: '',
	},
	{
		name: 'Macular Degeneration Tests',
		add: '',
	},
	{
		name: 'Glaucoma & Eye Pressure Testing',
		add: '',
	},
	{
		name: 'Checks for Cataracts',
		add: '',
	},
	{
		name: 'Clearness of Vision',
		add: 'Myopia, Hyperopia, Astigmatism',
	},
	{
		name: 'Focusing Ability',
		add: 'Presbyopia',
	},
	{
		name: 'Eye Muscle Movement and Control',
		add: '',
	},
	{
		name: 'Amblyopia',
		add: 'Lazy eye',
	},
	{
		name: 'Contact Lens Fitting and Management',
		add: '',
	},
	{
		name: 'Referrals for Eye Laser Surgery',
		add: '',
	},
	{
		name: 'Mining & Industrial Safety Spectacles',
		add: '',
	},
	{
		name: 'Advice on the Correct Fitting of Good Quality Sunglasses',
		add: 'Both prescription and both adults and children, particularly in a sporting environment',
	},
];
function detectDeviceType() {
	const userAgent = navigator.userAgent || navigator.vendor || window.opera;

	// 모바일 기기 판별
	if (
		/android/i.test(userAgent) ||
		(/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
	) {
		return 'Mobile';
	} else {
		return 'Desktop';
	}
}
function handleSearchInputChange() {
	const serviceUl = document.querySelector(
		'#service > div:nth-of-type(2) > ul',
	);
	document
		.querySelector('input#search_service')
		.addEventListener('input', (evt) => {
			const value = String(evt.target.value).toLocaleLowerCase();
			const searchArr = services.filter(
				(service) =>
					service.name.toLocaleLowerCase().includes(value) ||
					service.add.toLocaleLowerCase().includes(value),
			);
			if (searchArr.length) {
				serviceUl.childNodes.forEach((child) => {
					child.style.display = 'none';
					//find the child node
					const filtered = searchArr.filter(
						(service) => service.name === child.textContent,
					);
					if (filtered.length) {
						child.style.display = 'inline-block';
					}
				});
			} else {
				serviceUl.childNodes.forEach((child) => {
					child.style.display = 'inline-block';
				});
			}
		});
}
