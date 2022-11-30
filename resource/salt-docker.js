function __loadMinionDockerPage(minion, context) {
    $('.docker_cmdItem').removeClass('activePage');
    $('.docker_cmdItem[item_id="'+context+'"]').addClass('activePage');
    $('#docker_contentTitle').text('');
    var docker_wait = $('<div>', { class: 'loading_place no-margin' });
    $('#docker_content').html(docker_wait);
    switch (context) {
        case "list_volumes":
            $('#docker_contentTitle').text('Docker Volumes');
            var c_tool = $('<div>', {
                class: 'adminNewObjectToolbar'
            });
            var c_filter = $('<input>', {
                type: 'text',
                placeholder: 'Filter',
                class: 'objectListFilter',
                list_id: 'docker_volumeList'
            });
            c_tool.append(c_filter, c_new);
            var c_list = $('<ul>', {
                class: 'objectList',
                id: 'docker_volumeList'
            });
            $.ajax({
                url: '/api/docker/' + minion + '/volumes',
                type: 'GET'
            }).fail((err) => {
                docker_wait.remove();
                var info = $('<div>', {
                    class: 'salt_infoNotice error',
                    text: 'Docker is not available on ' + minion + '. Is docker or docker-py installed?'
                });
                $('#docker_content').html(info);
                return false;
            }).done((res) => {
                console.log(res);
                docker_wait.remove();
                var noitems = $('<div>', {
                    class: 'salt_infoNotice',
                    text: minion + ' has no Docker volumes.'
                });
                $('#docker_content').append(c_tool.append(c_filter, c_new), c_list, noitems);
                $.each(res, function(id, data) {
                    if (typeof noitems != "undefined") { noitems.remove(); }
                    var nItem = $('<li>', {
                        class: 'objectItem docker_volumeItem',
                        minion: minion,
                        item_id: data.Name,
                        img_data: btoa(JSON.stringify(data))
                    });
                    var nIcon = $('<img>', {
                        class: 'objectItemIcon',
                        src: '/resource/plugins/salt-docker/assets/docker_vol.png'
                    });
                    var nLabel = $('<label>', {
                        class: 'objectItemLabel docker_volumeItemLabel',
                        text: data.Name,
                        item_id: data.Name
                    });
                    nItem.append(nIcon, nLabel);
                    c_list.append(nItem);
                });
            });
            break;
        case "list_images":
            $('#docker_contentTitle').text('Docker Images');
            var c_tool = $('<div>', {
                class: 'adminNewObjectToolbar'
            });
            var c_filter = $('<input>', {
                type: 'text',
                placeholder: 'Filter',
                class: 'objectListFilter',
                list_id: 'docker_imageList'
            });
            c_tool.append(c_filter, c_new);
            var c_list = $('<ul>', {
                class: 'objectList',
                id: 'docker_imageList'
            });
            $.ajax({
                url: '/api/docker/' + minion + '/images',
                type: 'GET'
            }).fail((err) => {
                docker_wait.remove();
                var info = $('<div>', {
                    class: 'salt_infoNotice error',
                    text: 'Docker is not available on ' + minion + '. Is docker or docker-py installed?'
                });
                $('#docker_content').html(info);
                return false;
            }).done((res) => {
                console.log(res);
                docker_wait.remove();
                var noitems = $('<div>', {
                    class: 'salt_infoNotice',
                    text: minion + ' has no known Docker images.'
                });
                $('#docker_content').append(c_tool.append(c_filter, c_new), c_list, noitems);
                $.each(res, function(id, data) {
                    if (typeof noitems != "undefined") { noitems.remove(); }
                    var nItem = $('<li>', {
                        class: 'objectItem docker_imageItem',
                        minion: minion,
                        item_id: id,
                        img_data: btoa(JSON.stringify(data))
                    });
                    var nIcon = $('<img>', {
                        class: 'objectItemIcon',
                        src: '/resource/plugins/salt-docker/assets/docker_img.png'
                    });
                    var nLabel = $('<label>', {
                        class: 'objectItemLabel docker_imageItemLabel',
                        text: data.RepoTags[0],
                        item_id: id
                    });
                    nItem.append(nIcon, nLabel);
                    c_list.append(nItem);
                });
            });
            break;
        case "list_networks":
            $('#docker_contentTitle').text('Docker Networks');
            var c_tool = $('<div>', {
                class: 'adminNewObjectToolbar'
            });
            var c_filter = $('<input>', {
                type: 'text',
                placeholder: 'Filter',
                class: 'objectListFilter',
                list_id: 'docker_networkList'
            });
            var c_new = $('<button>', {
                id: 'docker_newNetwork',
                text: 'New',
                minion: minion
            });
            var c_new_btn = $('<img>', {
                class: 'buttonIcon',
                src: '/resource/white_plus.png'
            });
            c_tool.append(c_filter, c_new.prepend(c_new_btn));
            var c_list = $('<ul>', {
                class: 'objectList',
                id: 'docker_networkList'
            });
            $('#docker_content').append(c_tool, c_list);
            $.ajax({
                url: '/api/docker/' + minion + '/networks',
                type: 'GET'
            }).fail((err) => {
                docker_wait.remove();
                var info = $('<div>', {
                    class: 'salt_infoNotice error',
                    text: 'Docker is not available on ' + minion + '. Is docker or docker-py installed?'
                });
                $('#docker_content').html(info);
                return false;
            }).done((res) => {
                docker_wait.remove();
                var nonetworks = $('<div>', {
                    class: 'salt_infoNotice',
                    text: minion + ' has no Docker networks.'
                });
                $('#docker_content').prepend(nonetworks);
                $.each(res, function(i, n) {
                    if (typeof nonetworks != "undefined") { nonetworks.remove(); }
                    var nItem = $('<li>', {
                        class: 'objectItem docker_networkItem',
                        minion: minion,
                        item_id: n.Id,
                        net_data: btoa(JSON.stringify(n))
                    });
                    var nIcon = $('<img>', {
                        class: 'objectItemIcon',
                        src: '/resource/plugins/salt-docker/assets/docker_net.png'
                    });
                    var nLabel = $('<label>', {
                        class: 'objectItemLabel docker_networkItemLabel',
                        text: n.Name,
                        item_id: n.Id
                    });
                    nItem.append(nIcon, nLabel);
                    if (typeof n.IPAM.Config != "undefined") {
                        if (typeof n.IPAM.Config[0] != "undefined") {
                            if (typeof n.IPAM.Config[0].Subnet != "undefined") {
                                var snStr = ' (Subnet: ' + n.IPAM.Config[0].Subnet + ')';
                                nLabel.append(snStr);
                                c_list.append(nItem);
                            }
                        }
                    }
                });
            });
            break;
        case "list_containers":
            $('#docker_contentTitle').text('Docker Containers');
            var c_tool = $('<div>', {
                class: 'adminNewObjectToolbar'
            });
            var c_filter = $('<input>', {
                type: 'text',
                class: 'objectListFilter',
                list_id: 'docker_containerList'
            });
            var c_new = $('<button>', {
                id: 'docker_newContainer',
                text: 'new',
                minion: minion
            });
            var c_new_btn = $('<img>', {
                class: 'buttonIcon',
                src: '/resource/white_plus.png'
            });
            c_new.prepend(c_new_btn);
            c_tool.append(c_filter, c_new);
            var c_list = $('<ul>', {
                class: 'objectList',
                id: 'docker_containerList'
            });
            $('#docker_content').append(c_tool, c_list);
            $.ajax({
                url: '/api/docker/' + minion + '/containers',
                type: 'GET'
            }).fail((err) => {
                docker_wait.remove();
                var info = $('<div>', {
                    class: 'salt_infoNotice error',
                    text: 'Docker is not available on ' + minion + '. Is docker or docker-py installed?'
                });
                $('#docker_content').html(info);
                return false;
            }).done((res) => {
                docker_wait.remove();
                var nocontainers = $('<div>', {
                    class: 'salt_infoNotice',
                    text: minion + ' has no registered Docker containers.'
                });
                $('#docker_content').prepend(nocontainers);
                $.each(res, function(i, c) {
                    if (typeof nocontainers != "undefined") { nocontainers.remove(); }
                    var c_item = $('<li>', {
                        class: 'objectItem docker_containerListItem'
                    });
                    var c_icon = $('<img>', {
                        class: 'objectItemIcon',
                        src: '/resource/plugins/salt-docker/assets/docker_container_white.png'
                    });
                    var c_label = $('<label>', {
                        class: 'objectItemLabel actionTrigger disableDefaultAction docker_containerListLabel',
                        action_class: '.docker_action',
                        text: c,
                        container: c,
                        item_id: btoa(JSON.stringify(c)),
                        minion: minion
                    });
                    var c_action = $('<div>', {
                        class: 'objectAction docker_action',
                        item_id: btoa(JSON.stringify(c))
                    });
                    var c_content = $('<div>', {
                        class: 'docker_containerContent',
                        minion: minion,
                        item_id: c
                    });
                    c_item.append(c_icon, c_label, c_action.append(c_content));
                    c_list.append(c_item);
                });
                return true;
            });
            break;
    }
}
$(document).on('click', '.docker_cmdItem', function() {
    var context = $(this).attr('item_id');
    var minion = $(this).attr('minion');
    __loadMinionDockerPage(minion, context);
});
$(document).on('click', '.docker_containerListLabel', function() {
    var minion = $(this).attr('minion');
    var container = $(this).attr('container');
    var cid = $(this).attr('item_id');
    var action = $('.docker_action[item_id="'+cid+'"]');
    var content = action.find('.docker_containerContent');
    var action_class = $(this).attr('action_class');
    let fetch = true;
    if (action.is(':visible')) {
        fetch = false;
    }
    toggleAction(action_class, cid);
    if (fetch === true) {
        $.ajax({
            url: '/api/docker/' + minion + '/containers/' + container,
            type: 'GET'
        }).fail((err) => {
            return false;
        }).done((res) => {
            console.log(res);
            content.text(JSON.stringify(res, null, 2));
            return true;
        });
    }
})