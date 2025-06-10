// ✅ js/mcp-builder.js
async function fetchText(url) {
  const res = await fetch(url);
  return res.ok ? await res.text() : "[读取失败]";
}

async function generatePrompt() {
  const task = document.getElementById("taskInput").value.trim();
  if (!task) {
    alert("请先输入任务目标");
    return;
  }

  const base = "https://ggeennn.github.io/projectforge/";
  const metaContext = await fetchText(base + "context/meta-context.md");
  const contextTemplate = await fetchText(base + "context/context-template.md");
  const promptStyle = await fetchText(base + "context/prompt-style.md");

  const fullPrompt = `# 🧠 使用者背景\n${metaContext}\n\n# 🎨 风格指引\n${promptStyle}\n\n# 🧩 对话上下文模板\n${contextTemplate}\n\n# 🎯 当前任务目标\n${task}\n\n请根据以上背景与任务，自动调用最适合的 prompt 并执行。`;

  document.getElementById("outputPrompt").value = fullPrompt;
}

function copyPrompt() {
  const prompt = document.getElementById("outputPrompt").value;
  navigator.clipboard.writeText(prompt).then(() => {
    alert("✅ 已复制到剪贴板");
  });
}
