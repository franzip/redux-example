module.exports = {
  idFactory: () => {
    const h = 17;
    const s = s => Math.floor(s).toString(h);
    return s(Date.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(Math.random() * h));
  },
  validateArticle: (article) => {
    if (typeof article.header !== 'string') {
      return 'header must be a string';
    }

    if (!article.header.length) {
      return 'header cannot be empty';
    }

    if (typeof article.body !== 'string') {
      return 'body must be a string';
    }

    if (!article.body.length) {
      return 'body cannot be empty';
    }
  }
};
