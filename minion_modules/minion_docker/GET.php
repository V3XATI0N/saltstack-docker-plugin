<div class="gridTop">
    <div class="gridLeft nav narrow-padding" id="docker_cmdList">
        <div class="salt_sectionTitle">Docker Commands</div>
        <div minion="<?= $minion ?>" class="user navItem docker_cmdItem activePage" item_id="list_containers">
            <img class="navItemIcon" src="/resource/plugins/salt-docker/assets/docker_container.png">
            Containers
        </div>
        <div minion="<?= $minion ?>" class="user navItem docker_cmdItem" item_id="list_networks">
            <img class="navItemIcon" src="/resource/plugins/salt-docker/assets/docker_networks.png">
            Networks
        </div>
        <div minion="<?= $minion ?>" class="user navItem docker_cmdItem" item_id="list_images">
            <img class="navItemIcon" src="/resource/plugins/salt-docker/assets/docker_images.png">
            Images
        </div>
        <div minion="<?= $minion ?>" class="user navItem docker_cmdItem" item_id="list_volumes">
            <img class="navItemIcon" src="/resource/plugins/salt-docker/assets/docker_volumes.png">
            Volumes
        </div>
    </div>
    <div class="gridRight content">
        <div class="adminContentCatch headerOnPage">
            <div class="salt_sectionTitle" id="docker_contentTitle">&nbsp;</div>
            <div id="docker_content">
                <div id="docker_wait" class="loading_place"></div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
$(document).ready(function () {
    __loadMinionDockerPage('<?= $minion ?>', 'list_containers');
});
</script>