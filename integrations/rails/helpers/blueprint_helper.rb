# BlueprintHelper
#
# Rails helper module for The Point design system.
# Provides methods for generating component HTML using built-in Rails helpers.
#
# Setup:
#   1. Copy the-point/core/ into vendor/assets/stylesheets/the-point/
#   2. In application.css: *= require the-point/index
#   3. Copy this file to app/helpers/blueprint_helper.rb
#   4. In app/helpers/application_helper.rb: include BlueprintHelper
#
# Usage:
#   <%= bp_button "Save", variant: :primary %>
#   <%= bp_button "Cancel", variant: :ghost, href: root_path %>
#   <%= bp_card hover: true do %>
#     <h3>Title</h3>
#   <% end %>

module BlueprintHelper

  # ── BUTTON ────────────────────────────────────────────────────────────────
  #
  # bp_button "Label", variant: :primary
  # bp_button "Go", variant: :outline, size: :lg, href: some_path
  # bp_button variant: :primary do ... end
  #
  # Options:
  #   variant:        :primary | :secondary | :outline | :ghost | :destructive
  #   size:           :xs | :sm | :md (default) | :lg | :xl
  #   href:           renders <a> instead of <button>
  #   icon_only:      true — adds bp-btn-icon class
  #   full_width:     true — adds bp-w-full class
  #   external:       true — adds target="_blank" rel="noopener noreferrer"
  #   icon:           prepend an icon character (e.g. "→", "＋")
  #                   :destructive defaults to "✕", external defaults to "↗"
  #                   pass icon: false to suppress
  #   icon_position:  :prepend (default) | :append
  #
  def bp_button(label = nil, variant: :primary, size: :md, href: nil,
                icon_only: false, full_width: false, external: false,
                icon: nil, icon_position: :prepend,
                **html_options, &block)
    label = capture(&block) if block

    resolved_icon = if icon == false
                      nil
                    else
                      icon || case variant.to_sym
                              when :destructive then "✕"
                              else external ? "↗" : nil
                              end
                    end

    content = if resolved_icon
                parts = icon_position.to_sym == :append ? [label, " #{resolved_icon}"] : ["#{resolved_icon} ", label]
                safe_join(parts.compact)
              else
                label
              end

    css = bp_classes(
      'bp-btn',
      "bp-btn-#{variant}",
      (size != :md) && "bp-btn-#{size}",
      icon_only  && 'bp-btn-icon',
      full_width && 'bp-w-full',
      html_options.delete(:class)
    )

    if href
      opts = html_options.merge(class: css)
      opts.merge!(target: '_blank', rel: 'noopener noreferrer') if external
      link_to content, href, **opts
    else
      content_tag :button, content, type: 'button', class: css, **html_options
    end
  end

  # ── BADGE ─────────────────────────────────────────────────────────────────
  #
  # bp_badge "Active",  variant: :success
  # bp_badge "Pending", variant: :warning
  #
  # Variants: :default | :secondary | :success | :warning | :error | :outline
  #
  # icon:          auto-inferred from variant (:success → "✓", :warning → "⚠", :error → "✕")
  #                pass icon: false to suppress, or icon: "●" to override
  # icon_position: :prepend (default) | :append
  #
  def bp_badge(text, variant: :default, icon: nil, icon_position: :prepend, **html_options)
    resolved_icon = if icon == false
                      nil
                    else
                      icon || case variant.to_sym
                              when :success then "✓"
                              when :warning then "⚠"
                              when :error   then "✕"
                              else               nil
                              end
                    end

    content = if resolved_icon
                parts = icon_position.to_sym == :append ? [text, " #{resolved_icon}"] : ["#{resolved_icon} ", text]
                safe_join(parts.compact)
              else
                text
              end

    css = bp_classes('bp-badge', "bp-badge-#{variant}", html_options.delete(:class))
    content_tag :span, content, class: css, **html_options
  end

  # ── CARD ──────────────────────────────────────────────────────────────────
  #
  # <%= bp_card do %>
  #   <%= bp_card_title "Title" %>
  #   Content
  # <% end %>
  #
  # <%= bp_card hover: true, bracket: true do %>...end %>
  #
  def bp_card(hover: false, feature: false, bracket: false, animate_draw: false, **html_options, &block)
    css = bp_classes(
      'bp-card',
      hover        && 'bp-card-hover',
      feature      && 'bp-card-feature',
      bracket      && 'bp-bracket',
      animate_draw && 'bp-animate-draw',
      html_options.delete(:class)
    )
    content_tag :div, class: css, **html_options, &block
  end

  def bp_card_header(**html_options, &block)
    content_tag :div, class: bp_classes('bp-card-header', html_options.delete(:class)), **html_options, &block
  end

  def bp_card_title(text = nil, **html_options, &block)
    content_tag :div, text || capture(&block), class: bp_classes('bp-card-title', html_options.delete(:class)), **html_options
  end

  def bp_card_description(text = nil, **html_options, &block)
    content_tag :div, text || capture(&block), class: bp_classes('bp-card-description', html_options.delete(:class)), **html_options
  end

  def bp_card_body(**html_options, &block)
    content_tag :div, class: bp_classes('bp-card-body', html_options.delete(:class)), **html_options, &block
  end

  def bp_card_footer(**html_options, &block)
    content_tag :div, class: bp_classes('bp-card-footer', html_options.delete(:class)), **html_options, &block
  end

  # ── ALERT ─────────────────────────────────────────────────────────────────
  #
  # <%= bp_alert variant: :warning, title: "Heads up" do %>
  #   Your session expires soon.
  # <% end %>
  #
  # Variants: :default | :success | :warning | :error
  #
  # icon:  auto-inferred from variant (:success → "✓", :warning → "⚠", :error → "✕")
  #        pass icon: false to suppress, or icon: "🔒" to override
  #
  def bp_alert(variant: :default, title: nil, icon: nil, **html_options, &block)
    body = capture(&block)
    css  = bp_classes('bp-alert', "bp-alert-#{variant}", html_options.delete(:class))

    resolved_icon = if icon == false
                      nil
                    else
                      icon || case variant.to_sym
                              when :success then "✓"
                              when :warning then "⚠"
                              when :error   then "✕"
                              else               nil
                              end
                    end

    content_tag :div, class: css, **html_options do
      safe_join([
        resolved_icon ? content_tag(:div, resolved_icon, class: 'bp-alert-icon') : nil,
        content_tag(:div, class: 'bp-alert-content') {
          safe_join([
            title ? content_tag(:div, title, class: 'bp-alert-title') : nil,
            body
          ].compact)
        }
      ].compact)
    end
  end

  # ── AVATAR ────────────────────────────────────────────────────────────────
  #
  # bp_avatar "JD", size: :md
  # bp_avatar src: image_url("photo.jpg"), alt: "Jane", size: :lg
  #
  # Sizes: :sm | :md (default) | :lg | :xl
  #
  def bp_avatar(initials = nil, size: :md, src: nil, alt: '', **html_options)
    css = bp_classes('bp-avatar', "bp-avatar-#{size}", html_options.delete(:class))

    content_tag :div, class: css, **html_options do
      src ? image_tag(src, alt: alt) : initials
    end
  end

  # ── FORM HELPERS ──────────────────────────────────────────────────────────
  #
  # bp_label f, :email, "Email address", hint: "We won't spam you"
  # bp_input f, :email
  # bp_input f, :email, error: true
  # bp_textarea f, :bio
  # bp_select f, :plan, options_for_select([["Free", "free"], ["Pro", "pro"]])
  #
  # Can also be used standalone (no form builder):
  # bp_label :email, "Email address"
  # bp_input :email, placeholder: "you@example.com"
  #
  def bp_label(form_or_attr, attr_or_text = nil, text = nil, hint: nil, **html_options)
    css = bp_classes('bp-label', html_options.delete(:class))
    if form_or_attr.respond_to?(:label)
      form_or_attr.label(attr_or_text, class: css, **html_options) do
        safe_join([
          text || attr_or_text.to_s.humanize,
          hint ? content_tag(:span, " (#{hint})", class: 'bp-label-hint') : nil
        ].compact)
      end
    else
      label_tag(form_or_attr, class: css, **html_options) do
        safe_join([
          attr_or_text,
          hint ? content_tag(:span, " (#{hint})", class: 'bp-label-hint') : nil
        ].compact)
      end
    end
  end

  def bp_input(form_or_name, attribute = nil, error: nil, **html_options)
    has_error = resolve_field_error(error, form_or_name, attribute)
    css = bp_classes('bp-input', has_error && 'bp-input-error', html_options.delete(:class))
    if form_or_name.respond_to?(:text_field)
      form_or_name.text_field(attribute, class: css, **html_options)
    else
      text_field_tag(form_or_name, html_options.delete(:value), class: css, **html_options)
    end
  end

  def bp_textarea(form_or_name, attribute = nil, error: nil, **html_options)
    has_error = resolve_field_error(error, form_or_name, attribute)
    css = bp_classes('bp-textarea', has_error && 'bp-input-error', html_options.delete(:class))
    if form_or_name.respond_to?(:text_area)
      form_or_name.text_area(attribute, class: css, **html_options)
    else
      text_area_tag(form_or_name, html_options.delete(:value), class: css, **html_options)
    end
  end

  def bp_select(form_or_name, attribute_or_choices = nil, choices = nil, error: nil, **html_options)
    has_error = resolve_field_error(error, form_or_name, attribute_or_choices)
    css = bp_classes('bp-select', has_error && 'bp-input-error', html_options.delete(:class))
    if form_or_name.respond_to?(:select)
      form_or_name.select(attribute_or_choices, choices, {}, class: css, **html_options)
    else
      select_tag(form_or_name, attribute_or_choices, class: css, **html_options)
    end
  end

  def bp_form_group(**html_options, &block)
    content_tag :div, class: bp_classes('bp-form-group', html_options.delete(:class)), **html_options, &block
  end

  def bp_form_error(text, **html_options)
    content_tag :p, text, class: bp_classes('bp-form-error', html_options.delete(:class)), **html_options
  end

  def bp_form_hint(text, **html_options)
    content_tag :p, text, class: bp_classes('bp-form-hint', html_options.delete(:class)), **html_options
  end

  # ── LAYOUT ────────────────────────────────────────────────────────────────
  #
  # bp_container { ... }
  # bp_container(size: :lg) { ... }
  # bp_section { ... }
  # bp_section(size: :lg, bg: :secondary) { ... }
  #
  def bp_container(size: nil, **html_options, &block)
    css = bp_classes('bp-container', size && "bp-container-#{size}", html_options.delete(:class))
    content_tag :div, class: css, **html_options, &block
  end

  def bp_section(size: :md, bg: nil, tag: :section, **html_options, &block)
    section_class = size == :sm ? 'bp-section-sm' : size == :lg ? 'bp-section-lg' : 'bp-section'
    css = bp_classes(section_class, html_options.delete(:class))
    style = bg == :secondary ? "background-color: var(--color-bg-secondary);" : html_options[:style]
    content_tag tag, class: css, style: style, **html_options.except(:style), &block
  end

  def bp_grid(cols: 3, **html_options, &block)
    css = bp_classes('bp-grid', "bp-grid-#{cols}", html_options.delete(:class))
    content_tag :div, class: css, **html_options, &block
  end

  # ── DIVIDER ───────────────────────────────────────────────────────────────
  #
  # bp_divider              → plain <hr>
  # bp_divider "or"         → text divider with lines
  #
  def bp_divider(label = nil, **html_options)
    if label
      content_tag :div, label, class: bp_classes('bp-divider', html_options.delete(:class)), **html_options
    else
      tag :hr, **html_options
    end
  end

  # ── SKELETON ──────────────────────────────────────────────────────────────
  #
  # bp_skeleton
  # bp_skeleton variant: :title
  # bp_skeleton variant: :text, width: "60%"
  # bp_skeleton units: 2            → 80px (2 × 40px grid unit)
  # bp_skeleton units: 4, width: "50%"
  #
  # units: 1 | 2 | 3 | 4 | 6  — snaps height to the 40px blueprint grid
  # variant and units are mutually exclusive; units takes priority if both given
  #
  def bp_skeleton(variant: :base, units: nil, width: nil, height: nil, **html_options)
    css = bp_classes(
      'bp-skeleton',
      units                     && "bp-skeleton-#{units}u",
      !units && variant == :text  && 'bp-skeleton-text',
      !units && variant == :title && 'bp-skeleton-title',
      html_options.delete(:class)
    )
    style_parts = [
      width  && "width: #{width};",
      height && "height: #{height};",
      html_options.delete(:style)
    ].compact.join(' ')

    content_tag :div, '', class: css, style: style_parts.presence, **html_options
  end

  # ── SKELETON CARD ─────────────────────────────────────────────────────────
  #
  # Zero-layout-shift placeholder that matches bp-card exactly.
  # When real content loads, the bounding box stays identical — no shift.
  #
  # <%= bp_skeleton_card do %>
  #   <%= bp_skeleton units: 1, style: "width: 48px; border-radius: 8px;" %>
  #   <%= bp_skeleton units: 1, width: "140px" %>
  #   <%= bp_skeleton units: 1, width: "100%" %>
  #   <%= bp_skeleton units: 1, width: "80%" %>
  # <% end %>
  #
  def bp_skeleton_card(**html_options, &block)
    css = bp_classes('bp-skeleton-card', html_options.delete(:class))
    content_tag :div, class: css, **html_options, &block
  end

  # ── STAT ──────────────────────────────────────────────────────────────────
  #
  # bp_stat value: "99.98%", label: "Uptime", change: "0.01%", direction: :up
  # bp_stat value: "17",     label: "Incidents", change: "3", direction: :down
  #
  # direction:      :up | :down | :neutral (default: :up)
  # arrow_position: :prepend | :append  (default: :prepend)
  # icon:           override the arrow character, or pass icon: false to suppress
  #
  def bp_stat(value:, label:, change: nil, direction: :up, arrow_position: :prepend, icon: nil, **html_options)
    css = bp_classes('bp-stat', html_options.delete(:class))
    content_tag :div, class: css, **html_options do
      safe_join([
        content_tag(:div, value, class: 'bp-stat-value'),
        content_tag(:div, label, class: 'bp-stat-label'),
        change ? content_tag(:div, class: "bp-stat-change bp-stat-change-#{direction}") {
          resolved_icon = if icon == false
                            nil
                          else
                            icon || case direction.to_sym
                                    when :up   then "↑"
                                    when :down then "↓"
                                    else            nil
                                    end
                          end
          parts = arrow_position.to_sym == :append \
            ? [change, (resolved_icon ? " #{resolved_icon}" : nil)] \
            : [(resolved_icon ? "#{resolved_icon} " : nil), change]
          safe_join(parts.compact)
        } : nil
      ].compact)
    end
  end

  # ── MONO LABEL ────────────────────────────────────────────────────────────
  #
  # bp_mono_label "REF: AX-2.4.1"
  #
  def bp_mono_label(text, **html_options)
    content_tag :span, text, class: bp_classes('bp-mono-label', html_options.delete(:class)), **html_options
  end

  # ── ANNOTATION ────────────────────────────────────────────────────────────
  #
  # bp_annotation "Side note text"
  #
  def bp_annotation(text = nil, **html_options, &block)
    css = bp_classes('bp-annotation', html_options.delete(:class))
    content_tag :p, text || capture(&block), class: css, **html_options
  end

  # ── GRADIENT TEXT ─────────────────────────────────────────────────────────
  #
  # bp_gradient_text "highlighted phrase"
  #
  def bp_gradient_text(text, **html_options)
    content_tag :span, text, class: bp_classes('bp-text-gradient', html_options.delete(:class)), **html_options
  end

  # ── SECTION HEADER ────────────────────────────────────────────────────────
  #
  # bp_section_header label: "Features", title: "Everything you need", subtitle: "Optional"
  #
  def bp_section_header(label: nil, title: nil, subtitle: nil, **html_options)
    content_tag :div, class: bp_classes('bp-section-header', html_options.delete(:class)), **html_options do
      safe_join([
        label    ? content_tag(:span, label, class: 'bp-section-label') : nil,
        title    ? content_tag(:h2,   title, class: 'bp-section-title') : nil,
        subtitle ? content_tag(:p, subtitle, class: 'bp-section-subtitle') : nil,
      ].compact)
    end
  end

  private

  # Build a space-separated class string, ignoring nil and false values.
  def bp_classes(*classes)
    classes.flatten.select { |c| c.present? }.join(' ')
  end

  # Resolve whether a field has an error.
  # - error: nil  → auto-detect from form builder's model errors
  # - error: true/false → use as-is (explicit override)
  def resolve_field_error(error, form_or_name, attribute)
    return error unless error.nil?
    return false unless form_or_name.respond_to?(:object) && attribute

    form_or_name.object&.errors&.key?(attribute.to_sym) || false
  end
end
