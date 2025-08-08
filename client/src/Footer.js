import React from "react";

function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(90deg, #1e1e1e, #252526)",
        color: "#bbb",
        textAlign: "center",
        padding: "12px 0",
        fontSize: "14px",
        position: "fixed",
        bottom: 0,
        width: "100%",
        borderTop: "1px solid #333",
        letterSpacing: "0.5px",
        boxShadow: "0 -2px 5px rgba(0,0,0,0.3)",
      }}
    >
      <span style={{ color: "#61dafb", fontWeight: "bold" }}>
        © {new Date().getFullYear()} DYK Code: Online Code Editor
      </span>{" "}
      | Built with Deepak❤️Kumar using{" "}
      <a
        href="https://judge0.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "#f39c12",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Judge0 API
      </a>
    </footer>
  );
}

export default Footer;
