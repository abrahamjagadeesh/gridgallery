[
    '{{repeat(5, 7)}}', {

        title: '{{firstName()}} {{surname()}}',
        photo_credit: '{{lorem(10, "words")}}',
        description: '{{lorem(10, "words")}}',
        url: '',
        showcase: 'http://placehold.it/250x250/{{random("blue", "brown", "green")}}',
        image: [
            '{{repeat(random(integer(10, 12)))}}', {
                thumb: 'http://placehold.it/250x250/{{random("blue", "brown", "green")}}',
                large: 'http://placehold.it/250x250/{{random("blue", "brown", "green")}}'
            }
        ]
    }
]
