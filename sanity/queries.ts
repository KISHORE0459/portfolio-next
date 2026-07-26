export const portfolioQuery = `{
  "personalInfo": coalesce(
    *[_type == "personalInfo" && _id in ["personalInfo", "drafts.personalInfo"] && isVisible != false][0],
    *[_type == "personalInfo" && isVisible != false][0]
  ),
  "about": coalesce(
    *[_type == "aboutSection" && _id in ["aboutSection", "drafts.aboutSection"] && isVisible != false][0],
    *[_type == "aboutSection" && isVisible != false][0]
  ),
  "experiences": *[_type == "experience" && isVisible != false] | order(order asc),
  "skills": *[_type == "skill" && isVisible != false]{
    _id,
    name,
    orderRank,
    isVisible,
    "tag": tag->{ _id, title, orderRank },
    "iconUrl": icon.asset->url
  } | order(orderRank asc),
  "projects": *[_type == "project" && isVisible != false] | order(order asc)
}`;
