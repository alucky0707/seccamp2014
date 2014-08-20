print File.read("answer.base.md").gsub(/\{TEXTMD\}/){ File.read("text.md").gsub(/^(?!\[)/, "> ") }
