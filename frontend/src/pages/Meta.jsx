import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome To Saidham",
  description: "Come join us for daily Shirdi Saibaba services",
  keywords: "Sairam, Saibaba, Shirdi Saibaba",
};

export default Meta;
