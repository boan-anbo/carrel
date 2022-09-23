use carrel_scaffold::config::config::CarrelConfiguration;
use carrel_scaffold::scaffold::scaffold_struct::Scaffold;
use clap::*;

// struct clap args
#[derive(Parser, Default, Debug)]
#[clap(author = "Bo and Liz", version, about = "A command line interface for Carrel")]
struct Args {
    #[clap(
    long,
    short,
    value_parser,
    id = "new_project_name"
    )]
    new: String,
}

// write main function that parses command line arguments use Clap
fn main() {
    let args = Args::parse();

    let new_project_name: String = args.new;

    let current_dir = std::env::current_dir().unwrap();

    // print out new project name
    println!("New project name: {}", new_project_name);

    // print out current directory
    println!("Current directory: {}", current_dir.display());


    let scaffold = Scaffold::new_project(&new_project_name, &current_dir.display().to_string());

    scaffold
        .construct_project_folder()
        .expect("Failed to create project folder");


}
