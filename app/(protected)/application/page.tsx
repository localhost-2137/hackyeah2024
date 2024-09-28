import CompanyCard from "@/components/application/company-card";

const ApplicationPage = () => {
    return (
        <div className="container">
            <CompanyCard name="Company 1" img="https://scontent-waw2-1.xx.fbcdn.net/v/t1.15752-9/461520324_849314330599019_7208267945721936725_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=9f807c&_nc_ohc=qgdrVqS5St0Q7kNvgFmDpHU&_nc_ht=scontent-waw2-1.xx&_nc_gid=Asg7zd1_GM8VoSfChcmCEB6&oh=03_Q7cD1QEesAFTcIN1WJXztnc-2Hxs22dhWXu6ROtQHlImskp-LA&oe=671FD256" description="Description 1" tags={["tag1", "tag2"]} />
        </div>
    );

};

export default ApplicationPage;