# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_01_26_070954) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "feed_filters", force: :cascade do |t|
    t.string "url", null: false
    t.integer "pronoun", null: false
    t.jsonb "conditions", null: false
    t.jsonb "substitutions", null: false
    t.bigint "feed_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["feed_id"], name: "index_feed_filters_on_feed_id"
  end

  create_table "feeds", force: :cascade do |t|
    t.string "name", null: false
    t.string "feed_code", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["feed_code"], name: "index_feeds_on_feed_code"
  end

  add_foreign_key "feed_filters", "feeds"
end
