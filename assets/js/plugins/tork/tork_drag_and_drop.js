function intializeDragDrop(params) {
  // selectors
  const items = document.querySelectorAll(params.itemElement);

  const itemPlaceContainers = document.querySelectorAll(
    params.containerElement
  );

  // box heigh measurement
  const container_source = document.querySelector(
    params.containerTargetUniqueElement
  );
  const container_target = document.querySelector(
    params.containerSourceUniqueElement
  );

  function setBoxHeight() {
    let sourceBoxHeight = container_source.offsetHeight;
    let targetBoxHeight = container_target.offsetHeight;

    if (targetBoxHeight > sourceBoxHeight) {
      container_target.style.minHeight = targetBoxHeight + "px";
      container_source.style.minHeight = targetBoxHeight + "px";
    } else if (sourceBoxHeight > targetBoxHeight) {
      container_target.style.minHeight = sourceBoxHeight + "px";
      container_source.style.minHeight = sourceBoxHeight + "px";
    }
  }

  setBoxHeight();

  let dragableItem = null;

  items.forEach((item) => {
    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragend", dragEnd);
  });

  function dragStart() {
    dragableItem = this;
    setTimeout(() => {
      this.style.opacity = '.3';
    }, 0);
  }

  function dragEnd() {
    dragableItem = null;
    setTimeout(() => {
      this.style.opacity = '1';
      setBoxHeight();
    }, 0);

    setBoxHeight();
  }

  itemPlaceContainers.forEach((itemPlaceContainer) => {
    itemPlaceContainer.addEventListener("dragover", dragOver);
    itemPlaceContainer.addEventListener("dragenter", dragEnter);
    itemPlaceContainer.addEventListener("dragleave", dragLeave);
    itemPlaceContainer.addEventListener("drop", dragDrop);
  });

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter() {}
  function dragLeave() {}

  function dragDrop() {
    this.appendChild(dragableItem);
  }
}
