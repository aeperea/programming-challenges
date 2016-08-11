require 'json'

module Grammar

  def self.generate(filename = "grammar.json", random_order = false)
    @grammar = JSON.parse(File.read(filename))
    (1..10).map{ |i| start(random_order) }
  end

  def self.start(random_order = false)
    min, max = 2, 6
    total_syllables = rand(min..max)

    if total_syllables > 3
      first_name = build_name(rand(2..3), random_order)
      last_name  = build_name(2, random_order)
      return "#{first_name} #{last_name}"
    else
      first_name = build_name(rand(2..total_syllables), random_order)
      return "#{first_name}"
    end
  end

  def self.build_name(total_syl, random_order = false)
    name = (1..total_syl).map do |index|
      if random_order
        if index == 1
          @grammar.sample["syllable"].capitalize
        else
          @grammar.sample["syllable"]
        end
      else
        case index
        when 1
          first_syllable
        when total_syl
          last_syllable
        else
          middle_syllable
        end
      end
    end.join("")
    name
  end

  def self.first_syllable
    @grammar.select {|item| item["order"] == 'first'}.sample["syllable"].capitalize
  end

  def self.middle_syllable
    @grammar.select {|item| item["order"] == 'last'}.sample["syllable"]
  end

  def self.last_syllable
    @grammar.select {|item| item["order"] == 'middle'}.sample["syllable"]
  end

end

puts Grammar.generate
