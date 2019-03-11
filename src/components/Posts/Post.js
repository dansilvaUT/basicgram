import React from "react";

export default function Product(props) {
  const { img_url, post_id } = props.post;

  componentDidMount() {
    
  }

  return (
    <div>
      <div>
        <div>
          <div height="80px" />
          <img alt={post_id} src={img_url} width="100%" height="300px" />
        </div>
      </div>
    </div>
  );
}
