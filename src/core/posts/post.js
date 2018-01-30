import { Record } from 'immutable';

export const Post = new Record({
  id: null,
  attributes: new Record({
    body: null,
    published: false,
    title: null,
  }),
  links: null,
  type: null,
});
