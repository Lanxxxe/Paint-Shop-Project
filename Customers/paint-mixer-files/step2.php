<div class="main-container">
    <div class="progress-container">
        <?php 
            include_once("./paint-mixer-files/steps-nav.php");
        ?>

        <div class="select-color-container">
            <a href="#">< Select a Different Color</a>
            <h1>Find Colors for Your Photo</h1>
    
            <div class="pick-color">
                <div>
                    <img src="https://visualizecolor.blob.core.windows.net/ppgpaints/colorspage/browseall.jpg" alt="">
                    <span>Browse All Colors</span>
                </div>
                <div>
                    <img src="https://visualizecolor.blob.core.windows.net/ppgpaints/colorspage/collections.jpg" alt="">
                    <span>View Curated Palettes</span>
                </div>
            </div>  
        </div>
        
    </div>

    <?php include './paint-mixer-files/paint-order.php' ?>
</div>