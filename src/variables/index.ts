export const scriptString = '<script>print()</script>';
export const svgXss = '<svg><script>alert("XSS")</script></svg>';
export const iframeXss = '<button onclick="alert(\'Cookie: \' + document.cookie)">Read Cookie from iframe</button>';
