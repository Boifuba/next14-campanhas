import { DiscussionEmbed } from "disqus-react";
const DisqusComments = ({ post }) => {
  const disqusShortname = "campanhasdoboi";
  const disqusConfig = {
    url: "https://campanhasdoboi.com.br/rpg/" + post.slug,
    identifier: post.id, // Single post id
    title: post.title, // Single post title
  };
  return (
    <div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};
export default DisqusComments;
