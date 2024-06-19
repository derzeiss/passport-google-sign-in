interface PopupOptions {
  url: string;
  target?: string;

  width?: number;
  height?: number;

  onClose?: () => void;
}

export const openPopup = (options: PopupOptions) => {
  const opt = {
    width: options.width ?? 400,
    height: options.height ?? 640,
    ...options,
  };

  // Fixes dual-screen position                            Most browsers      Firefox
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

  const systemZoom = width / window.screen.availWidth;
  const left = (width - opt.width) / 2 / systemZoom + dualScreenLeft;
  const top = (height - opt.height) / 2 / systemZoom + dualScreenTop;

  console.log(top, left, width, height, systemZoom);

  const params = `
    scrollbars=no,
    resizable=no,
    status=no,
    location=yes,
    toolbar=no,
    menubar=no,
    width=${opt.width},
    height=${opt.height},
    left=${left},
    top=${top}
  `;

  // const params = 'width=500,height=500';
  const popup = open(opt.url, opt.target, params);

  const interval = setInterval(() => {
    if (popup?.closed) {
      clearInterval(interval);
      if (opt.onClose) opt.onClose();
    }
  }, 500);

  return popup;
};
