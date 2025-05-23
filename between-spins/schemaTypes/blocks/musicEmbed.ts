import {defineType} from 'sanity'

export default defineType({
  name: 'embed',
  type: 'object',
  title: 'Embed (Apple Music/Spotify)',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'URL',
      description: 'The URL of the embed',
    },
  ],
  preview: {
    select: {
      url: 'url',
    },
    prepare({url}) {
      return {
        title: 'Embedded Music',
        subtitle: url,
      }
    },
  },
})
