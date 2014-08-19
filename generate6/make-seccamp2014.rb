require 'base64'

base64 = Base64.encode64(File::binread("../generate5/seccamp2014.7z")).tr("qwertyuiopasdfghjklzxcvbnm", "lkjhgfdsamnbvcxzpoiuytrewq")
src = "return\"if(typeof encrypted==='undefined')console.log('$ cp seccamp2014.py seccamp2014.html && open seccamp2014.html');else{e=encrypted.toString();alert(''"
msg = "Hint: Pa-tto! Pa-tto! Hareyakani!"
pat = {
  "true"=>  "(!!$+[])",
  "NaN"=>   "((____/____)+[])",
  "false"=> "(!$+[])",
  "constructor"=> "$_",
  "undefined"=> "([][$]+[])",
}
str = "function encrypted(){/*\n<script src=\"seccamp2014.py\"></script>\n#{base64}\n-!''';q=\"__END__=0;s=1//2or'''%s''';q=%c%s%c;print(q%%(s,42,q,42))\";print(q%(s,42,q,42))#*/}"
msg.chars do |c|
  (src << "+':'"; next) if c == ?:
  i = str.index c
  (puts "error: #{c.inspect}"; exit) unless i
  src << "+e[#{i}]"
end

src << ")}\""

src2 = []
src.chars do |c|
  flag = false
  pat.each do |k, v|
    i = k.index c
    if i
      src2.push "#{v}[#{i.to_s(2).rjust(4,?0).tr('01','_$')}]"
      flag = true; break
    end
  end
  unless flag
    if c == ?"
      src2.push "'\"'"
    else
      src2.push "'\\\\'+#{c.ord.to_s(8).rjust(3,?0).split('').map{|c|c.to_i.to_s(2).rjust(4,?0).tr('01','_$')}*?+}"
    end
  end
end

src2 = src2.join('+')

base = File.read "seccamp2014.base.py"
print base.sub(/\{SRC\}/){ src2 }.sub(/\{BASE64\}/){ base64 }
