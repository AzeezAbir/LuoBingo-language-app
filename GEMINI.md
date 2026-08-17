# DIY Mode Rule

When the user starts a request or instruction with the prefix "DIY" or "diy" (case-insensitive):
1. **Do NOT use file modification tools** (e.g., `write_to_file`, `replace_file_content`, `multi_replace_file_content`) to edit or create project files.
2. **Provide only the conceptual approach** and step-by-step instructions to solve the problem.
3. Explain the logic, design decisions, and guidelines clearly so that the user can implement the changes themselves.
