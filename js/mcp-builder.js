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

  // 资源配置
  const resources = [
    {
      name: "Project Readme",
      path: "README.md",
      type: "markdown",
      description: "主项目使用说明"
    },
    {
      name: "Roadmap",
      path: "plans/roadmap.md",
      type: "markdown",
      description: "全栈成长路线图"
    },
    {
      name: "Prompt Style Guide",
      path: "context/prompt-style.md",
      type: "markdown",
      description: "提示词风格指引"
    },
    {
      name: "Meta Context",
      path: "context/meta-context.md",
      type: "markdown",
      description: "学习者背景与行为模型"
    },
    {
      name: "Context Template",
      path: "context/context-template.md",
      type: "markdown",
      description: "启动 AI 对话用的 prompt 初始化模板"
    },
    {
      name: "Project Status Tracker",
      path: "plans/status.md",
      type: "markdown",
      description: "记录各项目当前阶段与进度"
    },
    {
      name: "Portfolio Metadata",
      path: "portfolio.json",
      type: "json",
      description: "作品集项目元数据配置，用于智能索引/生成卡片"
    },
    {
      name: "Prompt Templates",
      path: "prompthub/prompts.json",
      type: "json",
      description: "标准化 prompts 模板定义，供 MCP 访问"
    }
  ];

  // 并发加载所有资源内容
  const resourceContents = await Promise.all(
    resources.map(async (res) => {
      const content = await fetchText(base + res.path);
      if (res.type === "json") {
        return `## ${res.name}\n*${res.description}*\n\n\`\`\`json\n${content}\n\`\`\``;
      } else {
        return `## ${res.name}\n*${res.description}*\n\n${content}`;
      }
    })
  );

  // 组装 prompt
  const fullPrompt = 
    `# 📚 资源参考\n${resourceContents.join('\n\n')}\n\n` +
    `# 🎯 当前任务目标\n${task}\n\n` +
    `请根据以上所有资源、背景与任务，自动调用最适合的 prompt 并执行。`;

  document.getElementById("outputPrompt").value = fullPrompt;
}

function copyPrompt() {
  const prompt = document.getElementById("outputPrompt").value;
  navigator.clipboard.writeText(prompt).then(() => {
    alert("✅ 已复制到剪贴板");
  });
}
