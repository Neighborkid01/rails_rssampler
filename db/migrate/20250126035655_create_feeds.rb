class CreateFeeds < ActiveRecord::Migration[7.1]
  def change
    create_table :feeds do |t|
      t.string :name, null: false
      t.string :feed_code, null: false, index: true

      t.timestamps
    end
  end
end
