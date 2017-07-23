/**
 * Created by dima on 07/07/2017.
 */
export default class RecalculatedObjectsGroup {
  constructor(groupItems, options = {}) {
    if (!Array.isArray(groupItems)) {
      throw Error('Group Items must be an array');
    }
    const group = new fabric.Group(groupItems, options);
    group.on('selected', this.onSelected);
    group.on('modified', this.onModified);

    group.recalculateACoords = this.recalculateACoords;
    return group;
  }

  onSelected() {
    this.selectedTop = this.top;
    this.selectedLeft = this.left;
  }

  onModified() {
    const groupObjects = this.getObjects();
    for (const groupItem of groupObjects) {
      groupItem.aCoords = this.recalculateACoords(groupItem);
    }
  }

  recalculateACoords(item) {
    const coords = {};
    const itemCoords = item.aCoords;
    const x = this.top - this.selectedTop;
    const y = this.left - this.selectedLeft;
    const offset = { x, y };

    coords.tr = new fabric.Point(itemCoords.tr.x - offset.x, itemCoords.tr.y - offset.y);
    coords.tl = new fabric.Point(itemCoords.tl.x - offset.x, itemCoords.tl.y - offset.y);
    coords.br = new fabric.Point(itemCoords.br.x - offset.x, itemCoords.br.y - offset.y);
    coords.bl = new fabric.Point(itemCoords.bl.x - offset.x, itemCoords.bl.y - offset.y);

    return coords;
  }
}
