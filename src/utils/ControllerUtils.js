
module.exports = {

  getPaginationInfo(page, size, data, total) {
    console.debug(`ControllerUtils::getPaginationInfo`);
    const hasNextPage = (parseInt(page) + 1) < Math.ceil(total['count(*)'] / parseInt(size));
    const pagination = {
      page: parseInt(page),
      numberOfElements: data.length,
      total: total['count(*)'],
      hasNextPage,
      isFirstPage: ( page <= 0 ),
      isLastPage: ( !hasNextPage ),
    };
    console.debug({ pagination });
    return pagination;
  },

  getPaginationPresenter(info, content) {
    return { page: { info, content } };
  }

}