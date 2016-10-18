'use strict';

const data = {
    meta: {
        title: 'Badges',
        jira: 'UNICSC-280',
        description: 'List of images to display additional information, like awards.',
    },
    demo: {
        section: '',
        size: 'u_size_15',
    },
    module: {
        variant: '',
        items: [
            {
                image: {
                    src: '${path}/assets/media/img/temp/award-a.png',
                    alt: 'This is company x',
                },
            },
            {
                image: {
                    src: '${path}/assets/media/img/temp/award-b.png',
                    alt: 'This is company x',
                },
            },
            {
                image: {
                    src: '${path}/assets/media/img/temp/award-c.png',
                    alt: 'This is company x',
                },
            },
        ],
    },

};

module.exports = data;

