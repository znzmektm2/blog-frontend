import React from 'react';
import styles from './PostList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import moment from 'moment';
import removeMd from 'remove-markdown';

const cx = classNames.bind(styles);

const PostItem = ({title, body, publishedDate, tags, id}) => {
 
  const tagList = tags.map(
    tag => <Link key={tag} to={`/tag/${tag}`}>#{tag}</Link>,
  );

  return (
    <div className={cx('post-item')}>
      <h2><Link to={`/post/${id}`}>{title}</Link></h2>
      <div className={cx('date')}>{moment(publishedDate).format('ll')}</div>

      {/* moment: 2020-04-19T12:59-0500 를 Mon Apr 19 2020 12:59:00 GMT-0500 로 바꿔줌 */}
      {/* .format('ll'): Mon Apr 19 2020 12:59:00 GMT-0500 를 Apr 19, 2020 로 바꿔줌 */}
      
      <p>{removeMd(body)}</p>
      <div className={cx('tags')}>
        {tagList}
      </div>
    </div>
  );
};

const PostList = ({posts}) => {
  const postList = posts.map(
    (post, inx) => {
      const { _id, title, body, publishedDate, tags } = post.toJS();
      return (
        <PostItem
          title={title}
          body={body}
          publishedDate={publishedDate}
          tags={tags}
          key={_id}
          id={_id}
        />        
      )
    }
  );

  return (
    <div className={cx('post-list')}>
      {postList}     
    </div>
  )
};

export default PostList;