

document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('.step4-container')) {
    return;
  }

  const roomData = JSON.parse(localStorage.getItem('editedRoom'));

  const visualizer = createVisualizer();
  let room = localStorage.getItem('room');

  if (!room || !visualizer.imageKeys.includes(room)) {
    window.location.href = "color-change.php?step=1";
  }
  visualizer.setImage(room)
    .then(() => {
      visualizer.fillImage(roomData.objects);
    })
    .catch((err) => {
      console.log(err);
    });
});