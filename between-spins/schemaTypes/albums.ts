import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'albums',
  title: 'Albums',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'artist',
      title: 'Artist',
      type: 'string',
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'string',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField(
      defineField({
        title: 'Genre',
        name: 'genre',
        type: 'string',
        options: {
          list: [
            {title: 'Alternative', value: 'Alternative'},
            {title: 'Blues', value: 'Blues'},
            {title: 'Classical', value: 'Classical'},
            {title: 'Country', value: 'Country'},
            {title: 'Dance', value: 'Dance'},
            {title: 'Electronic', value: 'Electronic'},
            {title: 'Hip‑Hop/Rap', value: 'Hip‑Hop/Rap'},
            {title: 'Jazz', value: 'Jazz'},
            {title: 'Latin', value: 'Latin'},
            {title: 'Pop', value: 'Pop'},
            {title: 'R&B/Soul', value: 'R&B/Soul'},
            {title: 'Reggae', value: 'Reggae'},
            {title: 'Rock', value: 'Rock'},
            {title: 'Singer/Songwriter', value: 'Singer/Songwriter'},
            {title: 'Soundtrack', value: 'Soundtrack'},
            {title: 'World', value: 'World'},
            {title: 'Holiday', value: 'Holiday'},
            {title: 'Christian & Gospel', value: 'Christian & Gospel'},
            {title: 'Stage & Screen', value: 'Stage & Screen'},
            {title: 'Urban Contemporary', value: 'Urban Contemporary'},
            {title: 'K-Pop', value: 'K-Pop'},
            {title: 'Classical Crossover', value: 'Classical Crossover'},
            {title: 'Dancehall', value: 'Dancehall'},
            {title: 'Afrobeats', value: 'Afrobeats'},
            {title: 'New Age', value: 'New Age'},
          ],
          layout: 'dropdown',
        },
      }),
    ),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
  ],
})
