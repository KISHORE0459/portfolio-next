export const portfolioQuery = `{
  "personalInfo": *[_type == "personalInfo" && isVisible != false][0],
  "hero": *[_type == "heroSection" && isVisible != false][0],
  "about": *[_type == "aboutSection" && isVisible != false][0],
  "skills": *[_type == "skill" && isVisible != false] | order(order asc),
  "technologies": *[_type == "technology" && isVisible != false] | order(order asc),
  "experiences": *[_type == "experience" && isVisible != false] | order(order asc),
  "projects": *[_type == "project" && isVisible != false] | order(order asc),
  "education": *[_type == "education" && isVisible != false] | order(order asc),
  "achievements": *[_type == "achievement" && isVisible != false] | order(order asc),
  "services": *[_type == "service" && isVisible != false] | order(order asc),
  "testimonials": *[_type == "testimonial" && isVisible != false] | order(order asc),
  "socialLinks": *[_type == "socialLink" && isVisible != false] | order(order asc),
  "contact": *[_type == "contactInfo" && isVisible != false][0],
  "navigation": *[_type == "navItem" && isVisible != false] | order(order asc),
  "footer": *[_type == "footerContent" && isVisible != false][0],
  "seo": *[_type == "seoSettings"][0]
}`;
