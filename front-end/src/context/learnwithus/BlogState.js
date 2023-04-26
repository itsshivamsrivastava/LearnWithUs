import React, {useState} from "react";
import BlogContext from "./blogContext";

const BlogState = (props) => {
    // const s1 = {
    //     "name": "Shivam",
    //     "class": "12th"
    // };

    // const [state, setState] = useState(s1);
    // const update = () => {
    //     setTimeout(() => {
    //         setState({
    //             "name": "Anshika",
    //             "class": "10th"
    //         })
    //     }, 1000);
    // };

    const blogPostsInitial = [
        {
            "_id": "6403686ca3528611496b1f75",
            "user": "6402fbb8eabc0442cfdbf5ab",
            "blog_title": "My blog title2",
            "blog_subTitle": "My sub title2",
            "blog_slug": "my-blog2",
            "blog_content": "This is blog content2.",
            "__v": 0
        },
        {
            "_id": "6405c04aa892fa4ee8788205",
            "user": "6402fbb8eabc0442cfdbf5ab",
            "blog_title": "My blog title3",
            "blog_subTitle": "My sub title3",
            "blog_slug": "my-blog3",
            "blog_content": "This is blog content3.",
            "__v": 0
        }
    ];

    const [blogPosts, setBlogPosts] = useState(blogPostsInitial);

    return (
        <BlogContext.Provider value={{ blogPosts, setBlogPosts }}>
            {props.children}
        </BlogContext.Provider>
    );
};

export default BlogState;