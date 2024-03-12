class Controls {
  constructor() {}

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowUp') {
      console.log('up');
    }
  }

  enable() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  disable() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }
}
