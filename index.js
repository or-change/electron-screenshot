import { desktopCapturer, remote } from 'electron';

function getSize(screens) {
	const size = {
		width: 0,
		height: 0
	};

	screens.forEach(screen => {
		if (screen.bounds.x === size.width) {
			size.width = size.width + screen.bounds.width;
		}

		if (screen.bounds.y === size.height) {
			size.height = size.height + screen.bounds.height;
		}
	});

	return size;
}

export default function capture() {
	const screens = remote.screen.getAllDisplays();
	const size = getSize(screens);
	const { width, height } = size;

	return desktopCapturer.getSources({
		types: ['screen'],
		thumbnailSize: { width, height }
	}).then(sources => ({
		dataURL: sources.find(source => source.name === 'Entire screen').thumbnail.toDataURL(),
		size
	}));
}