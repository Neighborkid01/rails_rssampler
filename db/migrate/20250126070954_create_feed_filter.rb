class CreateFeedFilter < ActiveRecord::Migration[7.1]
  def change
    create_table :feed_filters do |t|
      t.string :url, null: false
      t.integer :pronoun, null: false
      t.jsonb :conditions, null: false
      t.jsonb :substitutions, null: false
      t.references :feed, null: false, foreign_key: true

      t.timestamps
    end
  end
end
