<div class="main-container step4-container">
    <div class="progress-container" style="flex: 1;">

        <?php 
            include_once("./paint-mixer-files/steps-nav.php");
        ?>

        <div class="choose-rooms-container">
            <a class="find-more-colors" href="color-change.php?step=2">
                <span class="material-symbols-outlined">keyboard_arrow_left</span>
                <span class="text">Visualize Your Room</span>
            </a>

            <div class="visualizer-canvas-container">
                <canvas id="visualizer-canvas"></canvas>
                <canvas id="zoomCanvas" class="hide"></canvas>
            </div>
        </div>
    </div>


</div>