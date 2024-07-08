import React from "react";
import Button from "../../components/ArticlePage/Button";
import PublishBlog from "../../components/ArticlePage/PublishBlog";

const WriteArticle = async () => {
  return (
    <div className="min-h-screen relative">
      <Button />
      <PublishBlog />
    </div>
  );
};

export default WriteArticle;
