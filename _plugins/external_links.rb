# _plugins/external_links.rb
require 'nokogiri'

module Jekyll
  class ExternalLinksFilter < Jekyll::Generator
    safe true
    priority :low

    def generate(site)
      site.pages.each { |page| process_links(page) }
      site.posts.docs.each { |post| process_links(post) }
    end

    def process_links(item)
      item.output = process_html(item.output) if item.output&.include?('<a')
    end

    def process_html(content)
      doc = Nokogiri::HTML::DocumentFragment.parse(content)
      doc.css('a[href]').each do |link|
        if link['href'] =~ /\A#{URI::regexp(['http', 'https'])}/
          link['target'] = '_blank'
          link['rel'] = 'noopener noreferrer'
        end
      end
      doc.to_html
    end
  end
end